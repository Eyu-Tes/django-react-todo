from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TodoSerializer
from .models import Todo


# Create your views here.
@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'List': 'GET - /api/todos',
        'Details': 'GET - /api/todos/<int:pk>',
        'Create': 'POST - /api/todos/',
        'Update': 'PUT - /api/todos/<int:pk>',
        'Delete': 'DELETE - /api/todos/<int:pk>'
    }
    return Response(api_urls)


@api_view(['GET', 'POST'])
def todo_list(request):
    if request.method == 'GET':
        todos = Todo.objects.all()
        # serialize instances
        # many=True, list of objects inside a single object
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def todo_detail(request, pk):
    # todo_obj = get_object_or_404(Todo, id=pk)
    try:
        todo_obj = Todo.objects.get(id=pk)
    except Todo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TodoSerializer(todo_obj)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TodoSerializer(instance=todo_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        todo_obj.delete()
        return Response({'message': 'Todo Deleted!'}, status=status.HTTP_204_NO_CONTENT)
