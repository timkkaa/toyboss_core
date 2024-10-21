from django.shortcuts import render
from django.views.generic import TemplateView




class HomeView(TemplateView):
    template_name = 'index.html'

class ProductView(TemplateView):
    template_name = 'product.html'

class ProductInnerView(TemplateView):
    template_name = 'product-inner.html'


class PublicationsView(TemplateView):
    template_name = 'publications.html'

class PublicationsInnerView(TemplateView):
    template_name = 'publications-inner.html'

class AboutCompanyView(TemplateView):
    template_name = 'about-company.html'



