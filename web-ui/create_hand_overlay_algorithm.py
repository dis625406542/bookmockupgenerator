"""
正确的手部覆盖算法
用于生成 book-with-hands-fixed.png 的完整代码

功能：将手部图片覆盖在书本图片上，去掉白色背景，保留手部轮廓
作者：AI助手
日期：2024年

算法核心思路：
1. 以书本图片作为基础背景
2. 检测手部遮罩中的非白色像素（手部轮廓区域）
3. 只在手部轮廓区域用遮罩图片覆盖书本图片
4. 保留手部轮廓的颜色和透明度
5. 白色背景区域保持书本内容不变
"""

from PIL import Image
import numpy as np

def create_hand_overlay_effect():
    """
    创建正确的手部覆盖效果：
    - book-backImage.png 正常显示（作为背景）
    - book-mask1.png 作为手部遮罩覆盖在书本上
    - 只保留手部轮廓，去掉白色背景，让书本内容透过
    - 手部轮廓覆盖在书本上
    
    Returns:
        str: 输出图片的路径
    """
    
    # 图片路径配置
    book_background_path = "src/assets/images/book-backImage.png"
    hand_mask_path = "src/assets/images/book-mask1.png"
    output_path = "src/assets/images/book-with-hands-fixed.png"
    
    try:
        # 步骤1: 打开书本背景图片
        book_bg = Image.open(book_background_path).convert('RGBA')
        print(f"✓ 书本背景图片加载成功: {book_bg.size}")
        
        # 步骤2: 打开手部遮罩图片
        hand_mask = Image.open(hand_mask_path).convert('RGBA')
        print(f"✓ 手部遮罩图片加载成功: {hand_mask.size}")
        
        # 步骤3: 尺寸匹配处理
        if hand_mask.size != book_bg.size:
            hand_mask = hand_mask.resize(book_bg.size, Image.Resampling.LANCZOS)
            print(f"✓ 手部遮罩尺寸已调整为: {hand_mask.size}")
        
        # 步骤4: 转换为numpy数组进行像素级处理
        book_array = np.array(book_bg)
        hand_array = np.array(hand_mask)
        
        # 步骤5: 创建结果数组（复制书本背景）
        result_array = book_array.copy()
        
        # 步骤6: 检测手部轮廓区域
        # 关键算法：检测非白色像素作为手部轮廓
        white_threshold = 240  # 白色阈值，可调节
        is_white = np.all(hand_array[:, :, :3] > white_threshold, axis=2)
        
        # 手部区域 = 非白色区域
        hand_regions = ~is_white
        
        print(f"✓ 检测到手部轮廓像素数: {np.sum(hand_regions)}")
        
        # 步骤7: 核心算法 - 在手部区域用遮罩图片覆盖书本图片
        # 只在手部轮廓区域进行像素替换
        result_array[hand_regions] = hand_array[hand_regions]
        
        # 步骤8: 转换回PIL图片格式
        result_image = Image.fromarray(result_array.astype(np.uint8))
        
        # 步骤9: 保存最终结果
        result_image.save(output_path, 'PNG')
        print(f"✓ 手部覆盖效果创建成功！")
        print(f"✓ 保存路径: {output_path}")
        print(f"✓ 最终图片尺寸: {result_image.size}")
        print(f"✓ 最终图片模式: {result_image.mode}")
        
        return output_path
        
    except Exception as e:
        print(f"❌ 创建手部覆盖效果时出错: {e}")
        import traceback
        traceback.print_exc()
        return None

def batch_process_hand_overlay(book_paths, mask_paths, output_dir="src/assets/images/"):
    """
    批量处理多张图片的手部覆盖效果
    
    Args:
        book_paths (list): 书本背景图片路径列表
        mask_paths (list): 手部遮罩图片路径列表  
        output_dir (str): 输出目录
    
    Returns:
        list: 输出图片路径列表
    """
    
    if len(book_paths) != len(mask_paths):
        print("❌ 书本图片和遮罩图片数量不匹配")
        return []
    
    results = []
    for i, (book_path, mask_path) in enumerate(zip(book_paths, mask_paths)):
        try:
            # 生成输出文件名
            output_filename = f"book-with-hands-{i+1}.png"
            output_path = output_dir + output_filename
            
            # 处理单张图片
            book_bg = Image.open(book_path).convert('RGBA')
            hand_mask = Image.open(mask_path).convert('RGBA')
            
            if hand_mask.size != book_bg.size:
                hand_mask = hand_mask.resize(book_bg.size, Image.Resampling.LANCZOS)
            
            book_array = np.array(book_bg)
            hand_array = np.array(hand_mask)
            result_array = book_array.copy()
            
            # 应用相同的算法
            white_threshold = 240
            is_white = np.all(hand_array[:, :, :3] > white_threshold, axis=2)
            hand_regions = ~is_white
            result_array[hand_regions] = hand_array[hand_regions]
            
            result_image = Image.fromarray(result_array.astype(np.uint8))
            result_image.save(output_path, 'PNG')
            
            results.append(output_path)
            print(f"✓ 批量处理 {i+1}/{len(book_paths)}: {output_filename}")
            
        except Exception as e:
            print(f"❌ 批量处理第 {i+1} 张图片失败: {e}")
    
    return results

if __name__ == "__main__":
    """
    使用示例：
    1. 单张图片处理
    2. 可以修改路径来处理其他图片
    """
    
    print("=" * 60)
    print("手部覆盖效果生成器")
    print("=" * 60)
    
    # 执行单张图片处理
    result_path = create_hand_overlay_effect()
    
    if result_path:
        print("\n" + "=" * 60)
        print("处理完成！效果说明：")
        print("- 书本内容正常显示")
        print("- 手部轮廓覆盖在书本上")
        print("- 白色背景被去除")
        print("- 形成手部覆盖在书本上的真实效果")
        print("=" * 60)
    else:
        print("\n❌ 处理失败，请检查输入图片")

    # 批量处理示例（可选）
    # book_list = ["src/assets/images/book1.png", "src/assets/images/book2.png"]
    # mask_list = ["src/assets/images/mask1.png", "src/assets/images/mask2.png"]
    # batch_results = batch_process_hand_overlay(book_list, mask_list)
