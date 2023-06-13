from django import forms
from .models import Userdata

class Documentfrom (forms.ModelForm):
    class Meta:
        model = Userdata
        fields = ("username", "password", "language", "teller")