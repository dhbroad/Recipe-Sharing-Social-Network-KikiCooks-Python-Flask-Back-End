from functools import wraps
from flask import request, jsonify

from app.models import User

# here we are creating the @token_required decorator for protecting our API routes

def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        else:
            return {
                'status': 'not ok',
                'message': "Missing Header. Please add 'x-access-token' to your Headers."
            }
        if not token:
            return {
                'status': 'not ok',
                'message': "Missing Auth Token. Please log in to a user that has a valid token."
            }
        user = User.query.filter_by(apitoken=token).first()
        if not user:
            return {
                'status': 'not ok',
                'message': 'That token does not belong to a valid user.'
            }
        return func(user=user, *args, **kwargs)
    return decorated