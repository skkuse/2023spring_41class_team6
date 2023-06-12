'''
This is the file for generating the user data for the recommender system. We need to generate the data for the following:
1. The input is the leetcode_integrated_tagged.csv and user_info.csv. The output is the recommended question of leetcode to user.
2. In leetcode_integrated_tagged.csv, there's difficulty column. The difficulty is divided into 3 levels: Easy, Medium, and Hard.
3. In user_info.csv, there's level column. The level is divided into 3 levels: 1, 2, 3. 1 is the lowest level, 3 is the highest level.
4. Make the user's problem solving history. Generate dataframe which number of columns are same as the number of questions in leetcode_integrated_tagged.csv.
5. Note that number of questions are the max of the "id" column in leetcode_integrated_tagged.csv. There's duplicacy of the questions, since the we have four language in the dataset, c++, java, python, and javascript.
6. Consider acceptance rate and difficulty of the question to generate user's history.
7. Generate the user's history by using chi-square distribution. The higher the level, the higher the probability of solving the hard question. Also, number of solved questions need  to be distributed.
8. Save to user_history.csv. The columns are user_id and the question_ids, starting from 0. The number of columns are same as the number of questions in leetcode_integrated_tagged.csv.
'''
import pandas as pd
import numpy as np
import random
import csv
import hashlib
import string
import sys
import getpass
import os
import math
from tqdm import tqdm
df_user = pd.read_csv("user_info.csv")
df_question = pd.read_csv("leetcode_integrated.csv")
question_list = df_question["id"].tolist()
#drop duplicacy 
question_list = list(set(question_list))
#make df_user_history
df_user_history = pd.DataFrame(columns = ["user_id", "level", "language"] + question_list)
df_user_history["user_id"] = df_user["user_id"]
df_user_history["level"] = df_user["level"]
df_user_history["language"] = df_user["language"]
#df_user_history["progress"] = df_user["progress"]
#model = AlternatingLeastSquares(factors=50, regularization=0.01, iterations=50)
#make history
len_user = len(df_user)
for i in tqdm(range(len_user)):#may need 80min, 4800sec
    #get user's level
    level = df_user["level"][i]
    #get user's mode
    mode = df_user["mode"][i]
    #get user's language
    language = df_user["language"][i]
    #get user's progress
    #progress = df_user["progress"][i]
    #get user's password
    password = df_user["password"][i]
    #get user's user_id
    user_id = df_user["user_id"][i]

    #get user's history
    #get the number of solved questions, using chi-square distribution
    #the higher the level, the higher the probability of solving the hard question
    #the number of solved questions need to be distributed
    number_of_solved_questions = 0
    #get the number of solved questions
    if level == 1:
        number_of_solved_questions = np.random.chisquare(1)
    elif level == 2:
        number_of_solved_questions = np.random.chisquare(2)
    elif level == 3:
        number_of_solved_questions = np.random.chisquare(3)
    
    #get the number of solved questions
    number_of_solved_questions = int(number_of_solved_questions)
    
    #Generate history using chi-square distribution. The higher the level, the higher the probability of solving the hard question.
    #Use the acceptance rate and difficulty of the question to generate user's history.
    
    hist = []#size: len(question_list)
    hist = np.zeros(len(question_list))
    
    #get the top-number_of_solved_questions questions
    #get the acceptance rate and difficulty of the question
    #use the acceptance rate and difficulty of the question to generate user's history
    #the higher the acceptance rate, the higher the probability of solving the question
    #the higher the difficulty, the lower the probability of solving the question
    #the higher the level, the higher the probability of solving the hard question
    #the number of solved questions need to be distributed
    question_suggestion = []
    probability_easy = [0.2, 0.1, 0.05]
    probability_medium = [0.5, 0.3, 0.1]
    probability_hard = [0.8, 0.6, 0.3]
    probability = []
    if(level==1):
        probability = probability_easy
    elif(level==2):
        probability = probability_medium
    elif(level==3):
        probability = probability_hard
    for j in range(len(question_list)):
        #get the acceptance rate and difficulty of the question
        #input_question is the selecting one row in dataframe which has id of question_list[j]
        input_question = df_question.loc[df_question["id"].apply(lambda x: x==question_list[j])]
        #select first row of input_question
        input_question = input_question.iloc[0]
        acceptance_rate = input_question["acceptance_rate"]/100.0
        difficulty = input_question["difficulty"]
        if(difficulty=="Easy"):
            difficulty = 1/3.0
        elif(difficulty=="Medium"):
            difficulty = 2/3.0
        elif(difficulty=="Hard"):
            difficulty = 3/3.0
        #use the acceptance rate and difficulty of the question to generate user's history
        #the higher the acceptance rate, the higher the probability of solving the question
        #the higher the difficulty, the lower the probability of solving the question
        #the higher the level, the higher the probability of solving the hard question
        #the number of solved questions need to be distributed
        rating = input_question["rating"]/100.0
        if(input_question["dislikes"]!=0):
            like_ratio = input_question["likes"]/input_question["dislikes"]
        else:
            like_ratio = input_question["likes"]