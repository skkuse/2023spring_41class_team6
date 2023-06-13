from django.http import JsonResponse
from django.shortcuts import render
from common.models import Userdata, Language
from django.contrib.sessions.models import Session

# Create your views here.
def index(request):
    username = request.session.get('username')
    print(username)
    
    try:
        user = Userdata.objects.get(username = username)
        language = user.language
        print(language)
        context = None
        
        if str(language) == 'C++':
            context = {
                'chapter11':'C++ 개요',
                'chapter12':'개발환경 설정',
                'chapter13':'Hello, World! 출력',
                'chapter21':'데이터형',
                'chapter22':'입출력',
                'chapter23':'연산자',
                'chapter31':'조건문',
                'chapter32':'반복문',
                'chapter33':'배열',
                'chapter41':'포인터',
                'chapter42':'동적할당',
                'chapter43':'함수',
                'chapter51':'참조자',
                'chapter52':'객체지향 프로그래밍 기본',
                'chapter53':'객체지향 프로그래밍 활용',
            }
            
        elif str(language) == 'Python':
            context = {
                'chapter11':'Introduction\nto Python',
                'chapter12':'Variables',
                'chapter13':'Data Types',
                'chapter21':'Operators',
                'chapter22':'Control Statements',
                'chapter23':'Functions',
                'chapter31':'Lists',
                'chapter32':'Tuples',
                'chapter33':'Dictionaries',
                'chapter41':'File Handling',
                'chapter42':'Module',
                'chapter43':'Exception',
                'chapter51':'Object-Oriented Programming',
                'chapter52':'Inheritance',
                'chapter53':'Polymorphism',
            }
        elif str(language) == 'JAVA':
            context = {
                'chapter11':'Introduction to Java',
                'chapter12':'Variables',
                'chapter13':'Data Types',
                'chapter21':'Control Statements',
                'chapter22':'Methods',
                'chapter23':'Array',
                'chapter31':'Object-Oriented Programming',
                'chapter32':'Classes and Objects',
                'chapter33':'Inheritance',
                'chapter41':'Polymorphism',
                'chapter42':'Abstract Classes and Interface',
                'chapter43':'Exceptions',
                'chapter51':'Basic Input and Output',
                'chapter52':'Files and Streams',
                'chapter53':'Collections',
            }
        elif str(language) == 'JAVAscript':
            context = {
                'chapter11':'JavaScript 소개',
                'chapter12':'변수',
                'chapter13':'데이터 타입',
                'chapter21':'연산자',
                'chapter22':'제어문',
                'chapter23':'반복문',
                'chapter31':'함수',
                'chapter32':'스코프',
                'chapter33':'클로저',
                'chapter41':'객체',
                'chapter42':'배열',
                'chapter43':'배열 함수',
                'chapter51':'오류 처리',
                'chapter52':'파일 입출력',
                'chapter53':'ES6 문법',
            }

        #return render(request, 'curriculum/index.html', context)
        return JsonResponse(context, safe=False)
    except (Userdata.DoesNotExist):
        return JsonResponse({"succeess": False, "message": "User does not exist"})