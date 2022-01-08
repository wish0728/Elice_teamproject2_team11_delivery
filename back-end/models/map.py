from db_connect import db

class lon_lat_level1(db.Model):
    __tablename__ = 'lon_lat_level1'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    area1 = db.Column(db.String(45), nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    
    def as_dict(self):
        return {x.name: getattr(self, x.name) for x in self.__table__.columns if x.name in ['longitude','latitude']}

    
class lon_lat_level2(db.Model):
    __tablename__ = 'lon_lat_level2'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    area1 = db.Column(db.String(45), nullable=False)
    area2 = db.Column(db.String(45), nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    
    def as_dict(self):
        return {x.name: getattr(self, x.name) for x in self.__table__.columns if x.name in ['longitude','latitude']}

    
class lon_lat_level3(db.Model):
    __tablename__ = 'lon_lat_level3'
    __table_args__ = {'extend_existing': True}

    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    area1 = db.Column(db.String(45), nullable=False)
    area2 = db.Column(db.String(45), nullable=False)
    area3 = db.Column(db.String(45), nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    latitude = db.Column(db.Float, nullable=False)

    def as_dict(self):
        return {x.name: getattr(self, x.name) for x in self.__table__.columns if x.name in ['longitude','latitude']}

