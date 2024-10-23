from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)

    class Meta:
        verbose_name_plural = 'Категории'
        verbose_name = 'Категория'


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(verbose_name='Название', max_length=255)
    short_description = models.TextField(max_length=500)
    description = models.TextField()
    image = models.ImageField(upload_to='sausages/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    weight = models.DecimalField(verbose_name='Вес (г)', max_digits=5, decimal_places=2)
    price = models.DecimalField(verbose_name='Цена', max_digits=10, decimal_places=2)

    class Meta:
        verbose_name_plural = 'Продукция'
        verbose_name = 'Продукт'