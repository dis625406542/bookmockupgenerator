#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
测试用户上传图片与手部遮罩的合并效果
使用与 book-with-hands-fixed.png 相同的算法
优化版本：减少锯齿，提高平滑度
"""

from PIL import Image, ImageFilter, ImageEnhance
import numpy as np
import os

def merge_user_image_with_hand_mask():
    """将用户上传的图片与手部遮罩合并"""
    
    # 图片路径 - 修改为处理dog.png和book-mask1.png
    user_image_path = "src/assets/images/dog.png"
    hand_mask_path = "src/assets/images/book-mask1.png"
    output_path = "src/assets/images/dog-merged-with-mask-smooth.png"
    
    try:
        # 检查文件是否存在
        if not os.path.exists(user_image_path):
            print(f"错误：用户图片不存在: {user_image_path}")
            return
        
        if not os.path.exists(hand_mask_path):
            print(f"错误：手部遮罩不存在: {hand_mask_path}")
            return
        
        print(f"开始处理图片合并（边缘平滑优化版本）...")
        print(f"用户图片: {user_image_path}")
        print(f"手部遮罩: {hand_mask_path}")
        
        # 加载图片
        user_image = Image.open(user_image_path).convert('RGBA')
        hand_mask = Image.open(hand_mask_path).convert('RGBA')
        
        print(f"用户图片尺寸: {user_image.size}")
        print(f"手部遮罩尺寸: {hand_mask.size}")
        
        # 确保两张图片尺寸一致
        if user_image.size != hand_mask.size:
            print(f"调整手部遮罩尺寸以匹配用户图片...")
            # 使用高质量重采样，先放大再缩小以减少锯齿
            target_size = user_image.size
            intermediate_size = (target_size[0] * 2, target_size[1] * 2)
            
            print(f"中间尺寸: {intermediate_size}")
            
            # 先放大到中间尺寸，使用高质量重采样
            hand_mask_large = hand_mask.resize(intermediate_size, Image.Resampling.LANCZOS)
            
            # 再缩小到目标尺寸，使用高质量重采样
            hand_mask = hand_mask_large.resize(target_size, Image.Resampling.LANCZOS)
            
            print(f"调整后手部遮罩尺寸: {hand_mask.size}")
        
        # 边缘平滑处理
        print("开始边缘平滑处理...")
        
        # 1. 轻微高斯模糊，软化边缘
        hand_mask_smooth = hand_mask.filter(ImageFilter.GaussianBlur(radius=1.0))
        print("✓ 应用高斯模糊 (radius=1.0)")
        
        # 2. 使用中值滤波进一步平滑边缘
        hand_mask_smooth = hand_mask_smooth.filter(ImageFilter.MedianFilter(size=3))
        print("✓ 应用中值滤波 (size=3)")
        
        # 3. 轻微锐化，保持细节
        enhancer = ImageEnhance.Sharpness(hand_mask_smooth)
        hand_mask_smooth = enhancer.enhance(1.2)
        print("✓ 应用轻微锐化 (1.2x)")
        
        # 转换为numpy数组进行处理
        user_array = np.array(user_image)
        hand_array = np.array(hand_mask_smooth)
        
        print(f"用户图片数组形状: {user_array.shape}")
        print(f"手部遮罩数组形状: {hand_array.shape}")
        
        # 创建结果数组（复制用户图片）
        result_array = user_array.copy()
        
        # 应用手部覆盖算法
        # 检测手部遮罩中的非白色像素（手部轮廓区域）
        white_threshold = 240
        is_white = np.all(hand_array[:, :, :3] > white_threshold, axis=2)
        hand_regions = ~is_white
        
        print(f"白色像素阈值: {white_threshold}")
        print(f"检测到手部区域像素数: {np.sum(hand_regions)}")
        print(f"总像素数: {hand_regions.size}")
        
        # 分析手部遮罩的像素分布
        hand_rgb = hand_array[:, :, :3]
        white_pixels = np.sum(np.all(hand_rgb > white_threshold, axis=2))
        non_white_pixels = hand_rgb.size // 3 - white_pixels
        
        print(f"手部遮罩像素分析:")
        print(f"- 白色像素数: {white_pixels}")
        print(f"- 非白色像素数: {non_white_pixels}")
        print(f"- 白色像素比例: {white_pixels / (hand_rgb.size // 3) * 100:.2f}%")
        
        # 如果检测不到手部像素，尝试降低阈值
        if np.sum(hand_regions) == 0:
            print("警告：没有检测到手部轮廓像素，尝试降低阈值...")
            lower_threshold = 200
            is_white_lower = np.all(hand_array[:, :, :3] > lower_threshold, axis=2)
            hand_regions = ~is_white_lower
            print(f"降低阈值到 {lower_threshold} 后，检测到手部区域像素数: {np.sum(hand_regions)}")
        
        # 在手部区域，用遮罩像素覆盖用户图片
        if np.sum(hand_regions) > 0:
            result_array[hand_regions] = hand_array[hand_regions]
            print(f"成功应用手部覆盖效果")
        else:
            print("警告：仍然没有检测到手部区域，无法应用覆盖效果")
        
        # 转换回PIL图像
        result_image = Image.fromarray(result_array)
        
        # 最终边缘平滑处理
        print("应用最终边缘平滑...")
        # 对整个结果图像应用轻微的高斯模糊，进一步平滑边缘
        result_image = result_image.filter(ImageFilter.GaussianBlur(radius=0.5))
        print("✓ 最终高斯模糊 (radius=0.5)")
        
        # 保存结果
        result_image.save(output_path, 'PNG', optimize=True, quality=95)
        print(f"合并完成！结果保存到: {output_path}")
        
        # 显示一些统计信息
        print(f"\n处理完成统计:")
        print(f"- 输入用户图片: {user_image_path}")
        print(f"- 手部遮罩: {hand_mask_path}")
        print(f"- 输出结果: {output_path}")
        print(f"- 手部区域像素数: {np.sum(hand_regions)}")
        print(f"- 边缘平滑优化: 2倍重采样 + 高斯模糊 + 中值滤波 + 锐化 + 最终平滑")
        
    except Exception as e:
        print(f"处理失败: {str(e)}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    merge_user_image_with_hand_mask()
