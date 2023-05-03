from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.forms import UserCreationForm ,AuthenticationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from .models import Recipe, Favorite
from django.contrib import messages  
from django.db.models import Q
from . import forms

def recipe_list(request):
    recipes = Recipe.objects.all()
    return render(request, 'recipe_list.html', {'recipes': recipes})

def about(request):
    return render(request, 'about.html')

def search_recipes(query):
    return Recipe.objects.filter(
        Q(name__icontains=query) | 
        Q(ingredients__icontains=query) | 
        Q(instructions__icontains=query)
    )

def search(request):
    query = request.GET.get('query')
    results = []
    if query:
        results = search_recipes(query)
    context = {'query': query, 'recipes': results}  # заменить "results" на "recipes"
    return render(request, 'search.html', context)


def recipe_detail(request, recipe_id):
    recipe = get_object_or_404(Recipe, id=recipe_id)
    favorite_exists = False
    if request.user.is_authenticated:
        if Favorite.objects.filter(user=request.user, recipe=recipe).exists():
            favorite_exists = True
    context = {
        'recipe': recipe,
        'favorite_exists': favorite_exists,
    }
    return render(request, 'recipe_detail.html', context=context)
# Create your views here.

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
    else:
        form = AuthenticationForm()
    return render(request, 'registration/login.html', {'form': form})

def logout_page(request):
    logout(request)
    messages.add_message(request, messages.SUCCESS, "exit")
    return redirect('home')

@login_required
@require_POST
def add_or_remove_favorite(request):
    recipe_id = request.POST.get('recipe_id')
    recipe = Recipe.objects.get(id=recipe_id)
    user = request.user
    try:
        favorite = Favorite.objects.get(recipe=recipe, user=user)
        favorite.delete()
        action = 'removed'
    except Favorite.DoesNotExist:
        Favorite.objects.create(recipe=recipe, user=user)
        action = 'added'
    data = {'status': 'success', 'action': action}
    return JsonResponse(data)



@login_required
def favorite_recipes(request):
    favorites = Favorite.objects.filter(user=request.user)
    return render(request, 'favorite_recipes.html', {'favorites': favorites})
