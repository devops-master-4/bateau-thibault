from datetime import date
from django.shortcuts import render
from rest_framework.views import APIView
from transaction.models import InfoTransaction
from django.forms.models import model_to_dict
from django.http import JsonResponse
from product.views import TransactionType

# Create your views here.

#Obtient le cumul des ventes par produit et par jour
class getChiffreAffaire(APIView):
    def get(self,request,format=None):
        res = []
        for prod in InfoTransaction.objects.all():
            if(prod.type == TransactionType.Vente.value):
                isIn = False
                for elem in res:
                    if(elem[5] == prod.date.date() and elem[0] == prod.tig_id):
                        elem[4] += prod.sellPrice * prod.quantity
                        isIn = True
                        break
                if(not isIn):
                    res.append([prod.tig_id, prod.name, prod.category, prod.sale, prod.sellPrice * prod.quantity, prod.date.date()])
        return JsonResponse(res, safe=False)

#Obtient les bénéfices (total des ventes - total des achats : valeurs * quantité) par produit et par jour
class getBenefice(APIView):
    def get(self, request, format=None):
        res = []
        for prod in InfoTransaction.objects.all():
            isIn = False
            for elem in res:
                if(elem[5] == prod.date.date() and elem[0] == prod.tig_id):
                    if(prod.type == TransactionType.Achat.value):
                        elem[4] -= prod.buyPrice * prod.quantity
                        isIn = True
                        break
                    elif(prod.type == TransactionType.Vente.value):
                        elem[4] += prod.sellPrice * prod.quantity
                        isIn = True
                        break
            if(not isIn):
                if(prod.type == TransactionType.Achat.value):
                    res.append([prod.tig_id, prod.name, prod.category, prod.sale, -(prod.buyPrice * prod.quantity), prod.date.date()])
                elif(prod.type == TransactionType.Vente.value):
                    print(isIn)
                    res.append([prod.tig_id, prod.name, prod.category, prod.sale, prod.sellPrice * prod.quantity, prod.date.date()])
        return JsonResponse(res, safe=False)


class getTaxes(APIView):
    def get(self, request, format=None):
        res = []
        for prod in InfoTransaction.objects.all():
            isIn = False
            for elem in res:
                if(elem[1] == prod.date.date()):
                    if(prod.type == TransactionType.Achat.value):
                        elem[0] -= prod.buyPrice * prod.quantity
                        isIn = True
                        break
                    elif(prod.type == TransactionType.Vente.value):
                        elem[0] += prod.sellPrice * prod.quantity
                        isIn = True
                        break
            if(not isIn):
                if(prod.type == TransactionType.Achat.value):
                    res.append([-(prod.buyPrice * prod.quantity), prod.date.date()])
                elif(prod.type == TransactionType.Vente.value):
                    print(isIn)
                    res.append([prod.sellPrice * prod.quantity, prod.date.date()])

        for elem in res:
            print(elem[0])
            elem[0] = 0 if elem[0] < 0 else (30 * elem[0]) / 100

        return JsonResponse(res, safe=False)

class getStock(APIView):
    def get(self, request, format=None):
        res = []
        for prod in InfoTransaction.objects.all():
            isIn = False
            for elem in res:
                if(elem[0] == prod.tig_id and elem[5].date() == prod.date.date() and prod.date > elem[5]):
                    elem[5] = prod.date
                    elem[4] = prod.stock
                    isIn = True
                    break
            if(not isIn):
                    res.append([prod.tig_id, prod.name, prod.category, prod.sale, prod.stock, prod.date])

        for elem in res:
            elem[5] = elem[5].date()

        return JsonResponse(res, safe=False)


class getPrice(APIView):
    def get(self, request, format=None):
        res = []
        for prod in InfoTransaction.objects.all():
            isIn = False
            for elem in res:
                if(elem[0] == prod.tig_id and elem[5].date() == prod.date.date() and prod.date > elem[5]):
                    elem[5] = prod.date
                    elem[4] = prod.sellPrice
                    isIn = True
                    break
            if(not isIn):
                    res.append([prod.tig_id, prod.name, prod.category, prod.sale, prod.sellPrice, prod.date])

        for elem in res:
            elem[5] = elem[5].date()

        return JsonResponse(res, safe=False)

class getBuy(APIView):
    def get(self,request,format=None):
        res = []
        for prod in InfoTransaction.objects.all():
            if(prod.type == TransactionType.Achat.value):
                isIn = False
                for elem in res:
                    if(elem[5] == prod.date.date() and elem[0] == prod.tig_id):
                        elem[4] += prod.quantity
                        isIn = True
                        break
                if(not isIn):
                    res.append([prod.tig_id, prod.name, prod.category, prod.sale, prod.quantity, prod.date.date()])
        return JsonResponse(res, safe=False)

class getSell(APIView):
    def get(self,request,format=None):
        res = []
        for prod in InfoTransaction.objects.all():
            if(prod.type == TransactionType.Vente.value):
                isIn = False
                for elem in res:
                    if(elem[5] == prod.date.date() and elem[0] == prod.tig_id):
                        elem[4] += prod.quantity
                        isIn = True
                        break
                if(not isIn):
                    res.append([prod.tig_id, prod.name, prod.category, prod.sale, prod.quantity, prod.date.date()])
        return JsonResponse(res, safe=False)

class getLost(APIView):
    def get(self,request,format=None):
        res = []
        for prod in InfoTransaction.objects.all():
            if(prod.type == TransactionType.Perte.value):
                isIn = False
                for elem in res:
                    if(elem[5] == prod.date.date() and elem[0] == prod.tig_id):
                        elem[4] += prod.quantity
                        isIn = True
                        break
                if(not isIn):
                    res.append([prod.tig_id, prod.name, prod.category, prod.sale, prod.quantity, prod.date.date()])
        return JsonResponse(res, safe=False)
        