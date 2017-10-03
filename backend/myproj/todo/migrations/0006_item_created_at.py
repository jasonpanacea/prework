# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0005_auto_20171003_0210'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='created_at',
            field=models.DateField(default=datetime.datetime(2017, 10, 3, 2, 11, 41, 331106, tzinfo=utc), blank=True),
            preserve_default=False,
        ),
    ]
