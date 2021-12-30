from sqlalchemy.orm import relationship

from app import db

class deliveryfreq_by_time_area(db.Model):
    __tablename__ = "deliveryfreq_by_time_area"

    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Integer, nullable=False)
    delivery_freq = db.Column(db.Integer, nullable=False)
    area1_City_Do = db.Column(db.String(45), nullable=False)
    area2_Si_Gun_Gu = db.Column(db.String(45), nullable=False)
    area3_Dong = db.Column(db.String(45), nullable=False)

class member(db.Model):
    __tablename__ = "member"

    id = db.Column(db.String(10), primary_key=True, nullable=False)
    pw = db.Column(db.String(10), nullable=False)
    name = db.Column(db.String(10), nullable=False)

class weather(db.Model):
    __tablename__ = "weather"

    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Integer, nullable=False)
    area1_City_Do = db.Column(db.String(45), nullable=False)
    area2_Si_Gun_Gu = db.Column(db.String(45), nullable=False)
    area3_Dong = db.Column(db.String(45), nullable=False)

    # date = db.Column(db.Date, db.ForeignKey('deliveryfreq_by_time_area.date'), nullable=False)
    # time = db.Column(db.Integer, db.ForeignKey('deliveryfreq_by_time_area.time'), nullable=False)
    # area1_City_Do = db.Column(db.String(45), db.ForeignKey('deliveryfreq_by_time_area.area1_City_Do'), nullable=False)
    # area2_Si_Gun_Gu = db.Column(db.String(45), db.ForeignKey('deliveryfreq_by_time_area.area2_Si_Gun_Gu'), nullable=False)
    # area3_Dong = db.Column(db.String(45), db.ForeignKey('deliveryfreq_by_time_area.area3_Dong'), nullable=False)

    temperature = db.Column(db.Integer, nullable=True)
    rain = db.Column(db.Float)
    snow = db.Column(db.Float)
    dust = db.Column(db.Float)
    weather_alert = db.Column(db.String(45))

    

class Corona_info(db.Model):
    __tablename__ = 'Corona_info'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    date = db.Column(db.Date, nullable=False)
    area1_City_Do = db.Column(db.String(45), nullable=False)
    area2_Si_Gun_Gu = db.Column(db.String(45))
    area3_Dong = db.Column(db.String(45))

    # date = db.Column(db.Date, db.ForeignKey('deliveryfreq_by_time_area.date'), nullable=False)
    # area1_City_Do = db.Column(db.String(45), db.ForeignKey('deliveryfreq_by_time_area.area1_City_Do'), nullable=False)
    # area2_Si_Gun_Gu = db.Column(db.String(45), db.ForeignKey('deliveryfreq_by_time_area.area2_Si_Gun_Gu'))
    # area3_Dong = db.Column(db.String(45), db.ForeignKey('deliveryfreq_by_time_area.area3_Dong'))

    distancing_level = db.Column(db.Integer)
    restrict_time = db.Column(db.Integer)
    restrict_headcount = db.Column(db.Integer)

    


