# Generated by Django 4.2.1 on 2023-06-12 07:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0002_alter_userdata_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProbList',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=30)),
                ('qlist', models.JSONField(default=list)),
            ],
        ),
    ]