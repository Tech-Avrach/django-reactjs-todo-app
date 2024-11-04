from django.urls import path
from .views import list_todos, add_todo, delete_todo, update_todo

urlpatterns = [
    path("todos/", list_todos),
    path("todos/add/", add_todo),
    path("todos/delete/<int:pk>/", delete_todo),
    path("todos/edit/<int:pk>/", update_todo),
]
