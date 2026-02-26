import json
import os
import math

CONFIG_PATH = os.path.join(os.path.dirname(__file__), "gsd_config.json")

def load_config():
    with open(CONFIG_PATH, "r") as f:
        return json.load(f)

def pixel_to_meters(pixel_length):
    config = load_config()
    gsd = config["gsd"]
    return pixel_length * gsd

def estimate_depth(shadow_pixels):
    config = load_config()
    angle = config["incidence_angle"]

    shadow_m = pixel_to_meters(shadow_pixels)
    depth = math.tan(math.radians(90 - angle)) * shadow_m
    return depth