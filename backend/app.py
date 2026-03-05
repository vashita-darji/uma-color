from flask import Flask, request, jsonify
from flask_cors import CORS
import os, random
from twilio.rest import Client
from dotenv import load_dotenv

# load environment variables from .env when present (local dev)
load_dotenv()

app = Flask(__name__)
CORS(app)

# in-memory store of OTPs (for demo only)
otp_store = {}


@app.route('/')
def home():
    return jsonify({'status': 'ok', 'message': 'API running'})

@app.route('/api/send-otp', methods=['POST'])
def send_otp():
    data = request.get_json() or {}
    phone = data.get('phone')
    if not phone:
        return jsonify({'error': 'phone missing'}), 400

    code = str(random.randint(100000, 999999))
    otp_store[phone] = code

    # send sms via Twilio
    try: 
        twilio_sid = os.environ.get('TWILIO_ACCOUNT_SID')
        twilio_token = os.environ.get('TWILIO_AUTH_TOKEN')
        from_number = os.environ.get('TWILIO_FROM_NUMBER')
        if not (twilio_sid and twilio_token and from_number):
            raise RuntimeError('Twilio credentials not configured')

        client = Client(twilio_sid, twilio_token)
        # If `from_number` looks like a Messaging Service SID (starts with 'MG'),
        # send using messaging_service_sid, otherwise use from_
        if from_number.startswith('MG'):
            msg = client.messages.create(
                body=f"Your Uma Colors OTP is {code}",
                messaging_service_sid=from_number,
                to=phone
            )
        else:
            msg = client.messages.create(
                body=f"Your Uma Colors OTP is {code}",
                from_=from_number,
                to=phone
            )
        print('twilio message created:', getattr(msg, 'sid', None))
    except Exception as e:
        print('error sending sms', e)
        # return the error; include OTP only in DEBUG mode for development
        debug = os.environ.get('DEBUG', 'false').lower() in ('1', 'true', 'yes')
        payload = {'ok': False, 'error': str(e)}
        if debug:
            payload['code'] = code
        return jsonify(payload), 500

    # success: do not expose the OTP unless DEBUG mode is enabled
    debug = os.environ.get('DEBUG', 'false').lower() in ('1', 'true', 'yes')
    payload = {'ok': True}
    if debug:
        payload['code'] = code
        # include Twilio message SID in DEBUG so developer can inspect delivery
        try:
            payload['sid'] = getattr(msg, 'sid', None)
        except NameError:
            payload['sid'] = None
    return jsonify(payload)

@app.route('/api/verify-otp', methods=['POST'])
def verify_otp():
    data = request.get_json() or {}
    phone = data.get('phone')
    code = data.get('code')
    valid = otp_store.get(phone) == code
    if valid:
        otp_store.pop(phone, None)
    return jsonify({'valid': valid})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
