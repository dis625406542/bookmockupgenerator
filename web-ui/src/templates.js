// 引入你的模板图片
import bookBackground1 from '@/assets/images/book-background1.jpg';
import bookHighlights1 from '@/assets/images/book-highlights1.png'; // 这是你的图四
import bookMask1 from '@/assets/images/book-mask1.png';             // 这是你的图五

export const templates = {
    'child-book': { // 模板ID
        id: 'child-book',
        name: '小孩读书模板',
        layers: [
            {
                type: 'image',
                src: bookBackground1, // 底图
            },
            {
                type: 'transformed-image', // 特殊类型，表示需要透视变换
                name: 'cover',
                // 这是你通过阶段一工具生成的坐标！
                destPoints: [
                    { x: 385, y: 102 },
                    { x: 704, y: 125 },
                    { x: 631, y: 526 },
                    { x: 312, y: 490 },
                ],
            },
            {
                type: 'image',
                src: bookHighlights1, // 光影图
            },
            {
                type: 'image',
                src: bookMask1,       // 前景蒙版图（手指）
            },
        ]
    },
    // 你可以在这里添加更多模板...
};