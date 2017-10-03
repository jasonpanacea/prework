# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_item_created_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='item',
            name='created_at',
        ),
    ]
