from django.db import models

# Create your models here.
class Language(models.Model):
    id = models.AutoField(primary_key=True)
    language = models.CharField(max_length=10)
    
    def __str__(self):
        return self.language
    
class Teller(models.Model):
    id = models.AutoField(primary_key=True)
    teller = models.CharField(max_length=20)
    
    def __str__(self):
        return self.teller
    
class Userdata(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=15)
    language = models.ForeignKey(Language, on_delete=models.SET_NULL, null=True)
    teller = models.ForeignKey(Teller, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return self.username
    
class ProbList(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(Userdata, max_length=30)
    qlist = models.JSONField(default=list)