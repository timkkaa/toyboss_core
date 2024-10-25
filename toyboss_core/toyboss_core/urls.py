from django.contrib import admin
from django.urls import path

#from journal.views import HomeView, ProductView

from django.conf import settings
from django.conf.urls.static import static

from journal.views import HomeView, ProductView, ProductInnerView, PublicationsView, \
    PublicationsInnerView, AboutCompanyView, ReciponsView, ReciponsInnerView



urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', HomeView.as_view()),
    path('product/', ProductView.as_view(), name='product-url'),
    path('product-inner/<int:pk>/', ProductInnerView.as_view(), name='product-inner-url'),
    path('publications/', PublicationsView.as_view()),
    path('publications-inner/', PublicationsInnerView.as_view()),
    path('about-company/', AboutCompanyView.as_view()),
    path('recipes/', ReciponsView.as_view()),
    path('recipes-inner/', ReciponsInnerView.as_view()),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)