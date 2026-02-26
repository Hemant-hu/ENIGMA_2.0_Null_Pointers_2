import pandas as pd
import os

# Path to geometry CSV
GEOMETRY_PATH = os.path.join(os.path.dirname(__file__), "geometry.csv")

# Load once and cache
geometry_df = None

def load_geometry():
    global geometry_df
    if geometry_df is None:
        geometry_df = pd.read_csv(GEOMETRY_PATH)
    return geometry_df


def get_lat_lon(pixel_x, pixel_y):
    """
    Convert pixel (x, y) -> (latitude, longitude)
    using Chandrayaan geometry grid.

    pixel_x = column index
    pixel_y = row index (scan)
    """

    df = load_geometry()

    # Find nearest grid point
    closest = df.iloc[
        ((df["Pixel"] - pixel_x).abs() + (df["Scan"] - pixel_y).abs()).argsort()[:1]
    ]

    lat = float(closest["Latitude"].values[0])
    lon = float(closest["Longitude"].values[0])

    return lat, lon