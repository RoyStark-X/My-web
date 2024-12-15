import os
from pdf2image import convert_from_path

# 输入文件夹路径
pdf_dir = r"F:\Web\web\My-web\images\UAV\CAD\PDF"
output_dir = r"F:\Web\web\My-web\images\UAV\CAD\Images"  # 图片输出路径
poppler_path = r"D:\APPS\Poppler\Release-24.08.0-0\poppler-24.08.0\Library\bin"  # Poppler路径

# 文件名映射表
filename_mapping = {
    "大齿轮.pdf": "Large_Gear.pdf",
    "小齿轮.pdf": "Small_Gear.pdf",
    "总装配图.pdf": "Assembly_Drawing.pdf",
    "扩翼.pdf": "Wing_Expansion.pdf",
    "滑座.pdf": "Slide_Base.pdf",
    "电机传动部分.pdf": "Motor_Transmission.pdf",
    "电机外壳.pdf": "Motor_Housing.pdf",
    "齿圈.pdf": "Gear_Ring.pdf"
}

# 确保输出文件夹存在
os.makedirs(output_dir, exist_ok=True)

# 遍历文件夹，重命名并转换
for file in os.listdir(pdf_dir):
    old_path = os.path.join(pdf_dir, file)
    new_name = filename_mapping.get(file, None)
    
    if new_name:
        # 重命名PDF文件
        new_path = os.path.join(pdf_dir, new_name)
        os.rename(old_path, new_path)
        print(f"重命名: {file} -> {new_name}")
        
        # 转换PDF为图片
        images = convert_from_path(new_path, dpi=300, poppler_path=poppler_path)
        for i, image in enumerate(images):
            image_output_path = os.path.join(output_dir, f"{os.path.splitext(new_name)[0]}_page_{i + 1}.png")
            image.save(image_output_path, "PNG")
            print(f"转换: {new_name} -> {image_output_path}")
    else:
        print(f"未找到映射: {file}")

print("所有文件已成功翻译并转换为图片！")
