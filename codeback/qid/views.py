from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from common.models import Userdata, Language,ProbList
from django.contrib.sessions.models import Session
import random
import time


# Create your views here.
def index(request):
    username = request.session.get('username')
    print(username)

    try:
        user = ProbList.objects.get(username=username)
        qlist = user.qlist
        ret=random.choice(qlist)
        request.session['ret'] = ret
        print(ret)
        result=ret

        return HttpResponse(result)
    except (ProbList.DoesNotExist):
        print("없음")
        return JsonResponse({"succeess": False, "message": "User does not exist"})


def question(request):
    time.sleep(2)
    print("야호"+str(request.session['ret']))
    return HttpResponse(request.session['ret'])
