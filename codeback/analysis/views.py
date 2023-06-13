from django.shortcuts import render





from django.conf import settings
from common.models import Userdata
from django.http import JsonResponse, HttpResponse
import os
import openai
import csv

# Create your views here.
openai.api_key = settings.OPENAI_API_KEY

def index(request):
    response=''
    '''if request.method == 'POST':
        prompt = request.POST.get('animal')
        response = get_completion(prompt)
        #return JsonResponse({'response': response})'''

    if 'lang' in request.GET:
        language = request.GET['lang']
    if 'user_code' in request.GET:
        code=request.GET['user_code']
    qid = request.session.get('ret')
    print("문제:"+str(qid))
    response=get_completion(language,code,qid)
    #return render(request, 'workbook/index.html', {'result': response})
    #return HttpResponse("안녕?")

    return HttpResponse(response)

# OpenAI API Key
if settings.OPENAI_API_KEY:
    openai.api_key = settings.OPENAI_API_KEY
else:
    raise Exception('OpenAI API Key not found')

def get_completion(language,code,qid):
    #prompt는 DB에서 받아오는 것으로 변경. 현재 1인 경우 신데렐라로 가정.
    condition = ""
    input=''
    output=''
    file_name="static/"
    with open("static/q_inout.csv", encoding='UTF8') as f:
        reader=csv.reader(f)
        for row in reader:
            if(str(row[0]) == str(qid)):
                input=row[1]
                output=row[2]
                print('Row {}: {}'.format(row[0], row[1]))
                break;

    message = "Input: %s / Output: %s / Code: %s / Does this code returns output, given input? Language is %s. JUST " \
              "ANSWER IN YES OR NO. If No, Give me some explanation."%(input, output, code, language)
    messages = [
        {"role": "system", "content": "당신은 컴파일러입니다. 'YES' 또는 'NO'로만 대답합니다. 'NO'라면 이유를 설명해 주세요."},
    ]
    messages.append({"role": "user", "content": message},)
    chat = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
    reply = chat.choices[0].message.content
    print(messages)
    print(reply)
    return reply