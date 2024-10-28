from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True, )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Категории'
        verbose_name = 'Категория'

class Publication(models.Model):

    title = models.CharField(max_length=255)
    short_description = models.TextField(max_length=500)
    description = models.TextField()
    date_published = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='publications/', null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = 'Публикации'
        verbose_name = 'Публикация'


class Recipe(models.Model):
    name = models.CharField(max_length=255)
    instructions = models.TextField()

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=200, verbose_name='product')
    description = models.TextField(verbose_name='description')
    image = models.ImageField(upload_to='products/', verbose_name='image')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products", verbose_name='category')
    recipes = models.ManyToManyField(Recipe, related_name="products", verbose_name='recipe')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Продукция'
        verbose_name = 'Продукт'

class Contact(models.Model):
    phone_number = models.CharField(max_length=20, verbose_name="Номер телефона")
    facebook = models.URLField(verbose_name="Facebook", blank=True, null=True)
    instagram = models.URLField(verbose_name="Instagram", blank=True, null=True)

    class Meta:
        verbose_name = "Контакт"
        verbose_name_plural = "Контакты"

    def __str__(self):
        return self.phone_number


class About(models.Model):
    description = models.TextField(verbose_name="Описание компании")

    def __str__(self):
        return self.description