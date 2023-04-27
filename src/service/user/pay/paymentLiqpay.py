from liqpay import LiqPay

public_key = 'sandbox_i98441757663'
private_key = 'sandbox_JaBwypsn5eGVcDIIgWDcElXJy6NwEoRXFmh7UuGR'

liqpay = LiqPay(public_key, private_key)

payment_id = '000001'

params = {
    'action': 'status',
    'version': '3',
    'order_id': payment_id
}

# выполнение запроса
response = liqpay.api('request', params)
print(response)
