import json
from django.http import HttpResponse, JsonResponse
from .models import Userdata, ProbList
from .forms import Documentfrom
import os
from .recommender import recommender

# Create your views here.
def login(request):
    if request.method == 'POST':
        user_id = json.loads(request.body).get("user_id")
        password = json.loads(request.body).get("password")
        print(user_id)
        
        try:
            user = Userdata.objects.get(username = user_id)
            if user.password == password:
                request.session['username'] = user.username
                return JsonResponse(
                    {"success": True, "user":{"username": user.username}}
                )            
            else:
                return JsonResponse(
                    {"success": False, "user":{"username": "Invalid password"}}
                )
        except Userdata.DoesNotExist:
            return JsonResponse(
                {"success": False, "message": "User does not exist"}
            )
            
    return JsonResponse({"success": False, "message": "Invalid request"})
            

    '''message = request.GET.get('username')
    request.session['username'] = message
    print(str(message))
    return HttpResponse("")'''
    
    
def signup(request):    
    if request.method == "POST":
        data = json.loads(request.body)
        form = Documentfrom(data)
        if form.is_valid():
            form.save()
            user_id = json.loads(request.body).get("username")
            print(user_id)
            user = Userdata.objects.get(username = user_id)
            recommender_list = recommender(user.id, 5)
            prob_list = ProbList.objects.create(username=user, qlist=recommender_list)
            
            # register 100명 넘으면 commender.py run
            if Userdata.objects.count() > 100:
                os.system("python recommender_data.py")   
            return HttpResponse("Success")
        else:
            print(form.errors)
            return HttpResponse("Failed")
        