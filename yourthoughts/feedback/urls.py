from django.urls import path

from . import views

urlpatterns = [
    path('', views.FeedbackList.as_view(), name='feedbackList'),
    path('feedback/<str:module>', views.Feedback.as_view(), name='feedback'),
    # # path('<str:module>/', views.SurveyList.as_view(), name='survey'),
    # path('<int:pk>/', views.Survey.as_view(), name='survey'),
    # path('question/', views.QuestionList.as_view(), name='questions'),
    # path('results/', views.SubmissionList.as_view(), name='results'),

]