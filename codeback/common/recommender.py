#TODO
'''
This is recommender system for the user. If the new user is registered, then the system will recommend the user to watch the video based on the user's level and language preference.
Use SVDpp algorithm from implicit library to implement the recommender system.
'''
import pandas as pd
import numpy as np
import random
import os
from implicit import als
from tqdm import tqdm
import scipy.sparse as sparse
import pickle
def rating_history_generator():
    df_history = pd.read_csv("static/q_recommend_res.csv")
    df_user = pd.read_csv("static/user_info.csv")
    df_savor = pd.DataFrame(columns = ['user_id', 'item_id', 'rating'])
    for i in tqdm(range(len(df_history))):
        number_of_solved_questions = 0
        for j in range(len(df_history.columns)):
            if df_history.iloc[i, j] == -1:
                break
            else:
                number_of_solved_questions += 1
        if(number_of_solved_questions == 0):
            continue
        rating_list = sorted(random.sample(range(1, 100), number_of_solved_questions))
        rating_inv = [x/25.0 for x in rating_list]
        #5 - rating_inv
        rating_inv = [5 - x for x in rating_inv]
        input_ser = pd.DataFrame(columns = ['user_id', 'item_id', 'rating'])
        input_ser['user_id'] = [i]*number_of_solved_questions
        solved_q = []
        for j in range(number_of_solved_questions):
            solved_q.append(df_history.iloc[i, j])
        input_ser['item_id'] = solved_q
        input_ser['rating'] = rating_inv
        df_savor = pd.concat([df_savor, input_ser], ignore_index=True)
    #save df_savor to csv
    df_savor.to_csv("static/rating_data.csv", index = False)
def recommender(user_id, top_k):
    if(os.path.isfile("static/rating_data.csv")==False):
        rating_history_generator()
    df_savor = pd.read_csv("static/rating_data.csv")
    if(os.path.isfile("static/rec_model.pkl")==False):
        model = als.AlternatingLeastSquares(factors=50, regularization=0.01, iterations=50)
        #make sparse matrix
        sparse_matrix = sparse.csr_matrix((df_savor['rating'], (df_savor['user_id'], df_savor['item_id'])))
        #train the model
        model.fit(sparse_matrix)
        pickle.dump(model, open("static/rec_model.pkl", 'wb'))
    #load the model
    rec_model = pickle.load(open("static/rec_model.pkl", 'rb'))
    list_of_existing_user_id = df_savor['user_id'].tolist()
    list_of_existing_user_id = sorted(list(set(list_of_existing_user_id)))
    #Sort item_id according to occurence
    item_id_occurence = df_savor['item_id'].value_counts()
    item_id_occurence = item_id_occurence.sort_values(ascending=False)
    if user_id not in list_of_existing_user_id:
        #Mostpop
        return item_id_occurence.index.tolist()[:top_k]
    else:
        return rec_model.recommend(user_id, sparse.csr_matrix((df_savor['rating'], (df_savor['user_id'], df_savor['item_id']))), N = top_k, filter_already_liked_items = False)[0].tolist()
'''
def main(uid):
    #make recommendation
    recommender(uid, 5)
'''


##########recommender(user_id, top_k)##########으로 돌리시면 됩니다! 리턴은 리스트로 나옵니다. 