from db_connect import db

class deliveryfreq_by_time_area(db.Model):
    __tablename__ = "deliveryfreq_by_time_area"

    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Integer, nullable=False)
    delivery_freq = db.Column(db.Integer, nullable=False)
    area1_City_Do = db.Column(db.String(45), nullable=False)
    area2_Si_Gun_Gu = db.Column(db.String(45), nullable=False)
    area3_Dong = db.Column(db.String(45), nullable=False)

class freqavg (db.Model):
    __tablename__ = "freqavg"

    id = db.Column(db.String(10), primary_key=True, nullable=False)
    area1= db.Column(db.String(45), nullable=False)
    area2= db.Column(db.String(45), nullable=False)
    time = db.Column(db.Integer, nullable=False)
    freqavg = db.Column(db.Integer, nullable=False)

    def as_dict(self):
        return {x.name: getattr(self, x.name) for x in self.__table__.columns if x.name in ['time','freqavg']}

class freqavg_by_area1 (db.Model):
    __tablename__ = "freqavg_by_area1"

    id = db.Column(db.String(10), primary_key=True, nullable=False)
    area1= db.Column(db.String(45), nullable=False)
    time = db.Column(db.Integer, nullable=False)
    freqavg = db.Column(db.Integer, nullable=False)

    def as_dict(self):
        return {x.name: getattr(self, x.name) for x in self.__table__.columns if x.name in ['time','freqavg']}

class freqavg_by_day1(db.Model):
    __tablename__ = "freqavg_by_day1"

    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    area1= db.Column(db.String(45), nullable=False)
    day = db.Column(db.String(1), nullable=False)
    freqavg = db.Column(db.Integer, nullable=False)

    def as_dict(self):
        return {x.name: getattr(self, x.name) for x in self.__table__.columns if x.name in ['day','freqavg']}


class freqavg_by_day2(db.Model):
    __tablename__ = "freqavg_by_day2"

    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    area1= db.Column(db.String(45), nullable=False)
    area2= db.Column(db.String(45), nullable=False)
    day = db.Column(db.String(1), nullable=False)
    freqavg = db.Column(db.Integer, nullable=False)

    def as_dict(self):
        return {x.name: getattr(self, x.name) for x in self.__table__.columns if x.name in ['day','freqavg']}


class freqavg_by_mealtime1(db.Model):
    __tablename__ = "freqavg_by_mealtime1"

    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    area1= db.Column(db.String(45), nullable=False)
    area2= db.Column(db.String(45), nullable=False)
    mealtime = db.Column(db.String(10), nullable=False)
    freqavg = db.Column(db.Integer, nullable=False)

    def as_dict(self):
        return {x.name: getattr(self, x.name) for x in self.__table__.columns if x.name in ['area1','area2','area3','mealtime','freqavg']}

class freqavg_by_mealtime2(db.Model):
    __tablename__ = "freqavg_by_mealtime2"

    id = db.Column(db.Integer, autoincrement=True, primary_key=True, nullable=False)
    area1= db.Column(db.String(45), nullable=False)
    area2= db.Column(db.String(45), nullable=False)
    area3= db.Column(db.String(45), nullable=False)
    mealtime = db.Column(db.String(10), nullable=False)
    freqavg = db.Column(db.Integer, nullable=False)

    def as_dict(self):
        return {x.name: getattr(self, x.name) for x in self.__table__.columns if x.name in ['area1','area2','area3','mealtime','freqavg']}



