# Generated by Django 5.0.3 on 2024-04-16 13:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_orderitem_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='image',
            field=models.CharField(blank=True, default='static/images/camera.jpg', max_length=200, null=True),
        ),
    ]
