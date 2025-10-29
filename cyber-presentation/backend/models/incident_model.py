from datetime import datetime

class Incident:
    def __init__(self, type, description, severity, status='open'):
        self.type = type
        self.description = description
        self.severity = severity
        self.status = status
        self.timestamp = datetime.utcnow()

    def to_dict(self):
        return {
            'type': self.type,
            'description': self.description,
            'severity': self.severity,
            'status': self.status,
            'timestamp': self.timestamp
        }