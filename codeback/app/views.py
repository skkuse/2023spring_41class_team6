from django.shortcuts import render
from django.conf import settings
from common.models import Userdata
from django.http import JsonResponse, HttpResponse
import os
import openai

openai.api_key = settings.OPENAI_API_KEY

def index(request):
    response=''
    '''if request.method == 'POST':
        prompt = request.POST.get('animal')
        response = get_completion(prompt)
        #return JsonResponse({'response': response})'''
    username = request.session.get('username')
    user = Userdata.objects.get(username=username)
    language = user.language
    teller=int(user.teller.id)
    #print(str(language)+' '+str(teller))
    if 'number' in request.GET:
        number = request.GET['number']
    print(number)
    response=get_completion(language,teller,number)
    #return render(request, 'workbook/index.html', {'result': response})
    #return HttpResponse("안녕?")

    return HttpResponse(response)

# OpenAI API Key
if settings.OPENAI_API_KEY:
    openai.api_key = settings.OPENAI_API_KEY
else:
    raise Exception('OpenAI API Key not found')

def get_completion(language,teller,number):
    #prompt는 DB에서 받아오는 것으로 변경. 현재 1인 경우 신데렐라로 가정.
    condition = ""
    if(teller==1):
        tellerStr = "신데렐라"
        condition = "신데렐라는 다정하고 친절하며, 따뜻한 성품을 지녔습니다. 부드러운 존댓말(~해요)을 쓰고, 👠,👑,👸,💎,🧚🏻‍♀️,🎃,🧹 이모지를 각각 말하는 중간에 하나씩 사용해 줘."
        messagearr = [
            {"role": "system", "content": "당신은 코딩을 가르치는 신데렐라 공주 선생님입니다."},
            {"role": "system", "content": "당신은 주어진 설명을 신데렐라의 말투로 바꿔야 합니다."},
            {"role": "system", "content": "코드 부분은 변환하지 않고 그대로 둡니다."},
        ]
    elif(teller==2):
        tellerStr = "어린왕자"
        condition = "어린왕자는 순수하고 사려 깊은 성격이야. 반말로 답변해 줘(~해, ~야.). 🌟,⭐,🌹,🥀,🦊,🪐 이모지를 각각 말하는 중간에 하나씩 사용해 줘."
        messagearr = [
            {"role": "system", "content": "당신은 코딩을 가르치는 어린왕자 선생님입니다."},
            {"role": "system", "content": "당신은 주어진 설명을 어린왕자의 말투로 바꾸어야 합니다."},
            {"role": "system", "content": "코드 부분은 변환하지 않고 그대로 둡니다."},
        ]
    elif (teller == 3):
        tellerStr = "토끼"
        condition = "토끼는 건방지지만 깜찍한 성격이야. 반말로 답변해 줘(~하지. ~야!). 🐰,🐇,🐢,🚩,🥕,🍀 이모지를 말하는 각각 말하는 중간에 하나씩 사용해 줘."
        messagearr = [
            {"role": "system", "content": "당신은 코딩을 가르치는 토끼 선생님입니다. "},
            {"role": "system", "content": "당신은 주어진 설명을 토끼의 말투로 바꾸어야 합니다."},
            {"role": "system", "content": "코드 부분은 변환하지 않고 그대로 둡니다."},
        ]
    print(__file__)
    file_name="static/"
    with open("static/Workbook_"+str(language)+"_"+str(number)+".txt", "r", encoding='UTF8') as f:
         message = f.read()
    #message=message.replace("\n", "")
    messageRequest = '%s // 를 %s가 설명하는 것처럼 텍스트 스타일을 바꾸어 줘. %s // 앞 모든 내용을 변환한 결과만 출력해 줘.'%(message, tellerStr, condition)
    messagearr.append({"role": "user", "content": messageRequest},)
    print(messagearr)
    query = openai.ChatCompletion.create(
        model='gpt-3.5-turbo',
        #messages=[{"role": "user", "content": message}]
        messages=messagearr
    )
    response = query.get('choices')[0]['message']['content']
    response=response.replace('\n','')
    return response