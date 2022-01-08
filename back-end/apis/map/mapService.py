from flask import jsonify
from models.exception import area1_for_exception as a1, area2_for_exception as a2
from models.map import lon_lat_level1 as l1, lon_lat_level2 as l2

def exceptionForArea(area1: str,area2: str):
    area1_list = [row.area1 for row in a1.query.all()]
    area2_list = ["전체"] + [row.area2 for row in a2.query.filter_by(area1=area1).all()]
    if area1 not in area1_list:
        return {"message":"Unavailable area1"}, 400
    elif area2 not in area2_list:
        return {"message":"Unavailable area2"}, 400
    return 


def getGeocode(area1: str, area2: str):
    if exceptionForArea(area1,area2): return exceptionForArea(area1,area2)
    if area2 == '전체':
        rows = l1.query.filter_by(area1=area1).all()
    else:   
        rows = l2.query.filter_by(area1=area1, area2=area2).all()
    result = [row.as_dict() for row in rows]
    return jsonify(result)
        
