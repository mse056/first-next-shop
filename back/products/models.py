from django.db import models
from django.utils import timezone

class Product(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/')

    def __str__(self):
        return self.title

class DiscountCode(models.Model):
    code = models.CharField(max_length=50, unique=True)
    percentage = models.PositiveIntegerField(help_text="Percentage discount, e.g., 10 for 10%")
    active = models.BooleanField(default=True)
    valid_from = models.DateTimeField(default=timezone.now)
    valid_to = models.DateTimeField()

    def is_valid(self):
        now = timezone.now()
        return self.active and self.valid_from <= now <= self.valid_to

    def __str__(self):
        return f"{self.code} - {self.percentage}%"