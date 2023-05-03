from django.urls import path
from recipes import views
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.recipe_list, name='home'),
    path('<int:recipe_id>/', views.recipe_detail, name='recipe_detail'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register, name='register'),
    path('favorite/', views.favorite_recipes, name='favorite_recipes'),
    path('add_or_remove_favorite/', views.add_or_remove_favorite, name='add_or_remove_favorite'),
    path('logout/', views.logout_page, name='logout'),
    path('about/', views.about, name='about'),
    path('search/', views.search, name='search'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



