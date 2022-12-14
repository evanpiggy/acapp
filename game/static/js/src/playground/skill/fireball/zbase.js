class FireBall extends AcGameObject {
    constructor(playground, player, x, y, radius, vx, vy, color, speed, move_length, damage) {
        super();
        this.playground = playground;
        this.player = player;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.move_length = move_length;
        this.damage = damage;
        this.eps = 0.1;
    }

    start() {

    }

    update() {
        // 移动
        if(this.move_length < this.eps) {
            this.destory();
            return false;
        }
        let moved = Math.min(this.speed * this.timedelta / 1000, this.move_length);  // 真实移动距离
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.move_length -= moved;

        // 攻击玩家
        for(let i = 0; i < this.playground.players.length; i ++) {
            let player = this.playground.players[i];
            if(player != this.player && this.is_collision(player)) {
                this.attack(player);
            }
        }

        this.render();
    }

    get_dist(x1, y1, x2, y2) {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    is_collision(player) {
        let dst = this.get_dist(this.x, this.y, player.x, player.y);
        if(dst < this.radius + player.radius)
            return true;
        return false;
    }

    attack(player) {
        let angle = Math.atan2(player.y - this.y, player.x - this.x);
        player.is_attacked(angle, this.damage);
        this.destory();
    }

    render() {
        // 画圆
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}