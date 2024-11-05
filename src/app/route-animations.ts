// route-animations.ts
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  // Animation khi chuyển vào (enter)
  transition('* => *', [
    style({ opacity: 0, transform: 'translateX(-50px) scale(0.95)' }), // Bắt đầu từ vị trí dịch trái và thu nhỏ
    animate(
      '500ms cubic-bezier(0.25, 1, 0.5, 1)', // Đường cong cubic tạo cảm giác mượt mà
      style({ opacity: 1, transform: 'translateX(0) scale(1)' }) // Kết thúc ở vị trí bình thường
    )
  ]),

  // Animation khi chuyển ra (leave)
  transition('* => *', [
    animate(
      '400ms ease-in',
      keyframes([
        style({ opacity: 1, transform: 'translateX(0) scale(1)', offset: 0 }),
        style({ opacity: 0.5, transform: 'translateX(30px) scale(0.98)', offset: 0.5 }), // Nhẹ nhàng trượt về phải và thu nhỏ một chút
        style({ opacity: 0, transform: 'translateX(50px) scale(0.9)', offset: 1 })
      ])
    )
  ])
]);

