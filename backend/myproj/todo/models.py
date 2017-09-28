from django.db import models

# Create your models here.

from django.db import models


# Create your models here.
class Item(models.Model):
    content = models.TextField(max_length=200)
    status = models.IntegerField(default=0)
    priority = models.IntegerField(default=0)
    expire_date = models.DateField()
