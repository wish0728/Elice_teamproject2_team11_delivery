from db_connect import db

class area1_for_exception (db.Model):
    __tablename__ = "area1_for_exception"
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.String(10), primary_key=True, nullable=False)
    area1= db.Column(db.String(45), nullable=False)
    
    
class area2_for_exception (db.Model):
    __tablename__ = "area2_for_exception"
    __table_args__ = {'extend_existing': True}
    
    id = db.Column(db.String(10), primary_key=True, nullable=False)
    area1= db.Column(db.String(45), nullable=False)
    area2= db.Column(db.String(45), nullable=False)