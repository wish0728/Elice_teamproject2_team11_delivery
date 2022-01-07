from db_connect import db

class user(db.Model):
    __tablename__ = "user"
    id = db.Column(db.String(126), primary_key=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)
    name = db.Column(db.String(256), nullable=False)
    area = db.Column(db.String(256), nullable=False)

def init_db():
    db.create_all()
    
if __name__ == '__main__':
    init_db()