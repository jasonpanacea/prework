# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Item(models.Model):
    content = models.TextField(max_length=200)
    status = models.IntegerField(default=0)
    priority = models.IntegerField(default=0)
    expirate_date = models.DateField()