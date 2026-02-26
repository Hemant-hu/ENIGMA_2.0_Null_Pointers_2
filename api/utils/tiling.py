import cv2

def split_image(image, tile_size=1024, overlap=100):
    h, w = image.shape[:2]
    tiles = []

    for y in range(0, h, tile_size - overlap):
        for x in range(0, w, tile_size - overlap):
            tile = image[y:y+tile_size, x:x+tile_size]
            tiles.append((tile, x, y))  # tile + offset
    return tiles