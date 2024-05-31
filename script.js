// 加载 JSON 数据并渲染卡片
async function loadAndRenderCoffeeData() {
  try {
    const response = await fetch('coffee-data.json');
    const coffeeData = await response.json();

    // 获取筛选器元素
    const regionFilter = document.getElementById('region-filter');
    const categoryFilter = document.getElementById('category-filter');
    const roastFilter = document.getElementById('roast-filter');

    // 获取咖啡豆卡片容器
    const coffeeGrid = document.querySelector('.coffee-grid');

// 咖啡种类页面交互
const brewingCards = document.querySelectorAll('.brewing-card');

brewingCards.forEach(card => {
    const showMoreButton = card.querySelector('.show-more');
    const coffeeTypeContent = card.querySelector('.coffee-type-content');

    showMoreButton.addEventListener('click', () => {
        coffeeTypeContent.classList.toggle('show');
        showMoreButton.textContent = coffeeTypeContent.classList.contains('show') ? '收起' : '了解更多';
    });
});


// 函数：根据筛选条件过滤咖啡豆数据
function filterCoffeeData(data) {
  return data.filter(coffee => {
    const regionMatch = !regionFilter.value || coffee.region === regionFilter.value;
    const processMatch = !categoryFilter.value || coffee.process === categoryFilter.value;
    
    const roastMatch = !roastFilter.value || (coffee.roast && coffee.roast.includes(roastFilter.value)); 
    return regionMatch && processMatch && roastMatch;
  });
}

    // 函数：渲染咖啡豆卡片
    function renderCoffeeCards(data) {
      coffeeGrid.innerHTML = ''; // 清空容器
      data.forEach(coffee => {
        // 创建卡片元素
        const card = document.createElement('div');
        card.classList.add('coffee-card', 'col-md-4', 'mb-4'); // 使用 Bootstrap 网格系统

        // 创建卡片内容
        card.innerHTML = `
          
          <h3>${coffee.name}</h3>
          <p>地区：${coffee.region}</p>
          <p>类别：${coffee.category}</p>
          <p>烘焙度：${coffee.roast}</p>
          <p>处理法：${coffee.process}</p>
          <p>农场：${coffee.farm}</p>
          <p>品种：${coffee.variety}</p>
          <p>海拔：${coffee.altitude}</p>
          <p>风味：${coffee.flavorNotes}</p>
        `;

        // 将卡片添加到容器
        coffeeGrid.appendChild(card);
      });
    }

    // 初始化渲染所有咖啡豆卡片
    renderCoffeeCards(coffeeData);

    // 监听筛选器变化事件
    regionFilter.addEventListener('change', () => {
      const filteredData = filterCoffeeData(coffeeData);
      renderCoffeeCards(filteredData);
    });

    categoryFilter.addEventListener('change', () => {
      const filteredData = filterCoffeeData(coffeeData);
      renderCoffeeCards(filteredData);
    });

    roastFilter.addEventListener('change', () => {
      const filteredData = filterCoffeeData(coffeeData);
      renderCoffeeCards(filteredData);
    });
  } catch (error) {
    console.error('加载咖啡豆数据失败:', error);
    // 可以在这里显示错误信息给用户
  }
}

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', loadAndRenderCoffeeData);

// 鼠标悬停动画 - 仅应用于卡片图片
const elements = document.querySelectorAll(".bean-card img");
elements.forEach((element) => {
    element.addEventListener("mouseover", () => {
        element.style.transform = "scale(1.05)";
        element.style.transition = "transform 0.2s ease";
    });
    element.addEventListener("mouseout", () => {
        element.style.transform = "scale(1)";
    });
});

// 添加页面加载动画
document.addEventListener("DOMContentLoaded", function() {
    // 这里可以添加你的加载动画代码
});

// 获取地图容器元素
var mapContainer = document.getElementById("map");

// 创建地图对象
var map = L.map(mapContainer).setView([0, 0], 2); // 设置初始中心坐标和缩放级别

// 添加地图瓦片
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
}).addTo(map);

// 咖啡豆产地数据
var coffeeOrigins = [
  {
    name: "埃塞俄比亚",
    coordinates: [9.145, 40.4897],
    info: "阿拉比卡咖啡的起源地，以其花香和柑橘香气而闻名。",
    image: "images/coffee-2347989.jpg", //  添加图片路径
    mainVarieties: ["原生种", "铁皮卡", "波旁"], // 主要咖啡品种
    flavorNotes: ["花香", "柑橘", "柠檬", "茉莉花", "佛手柑", "莓果"] // 风味特点
  },
  {
    name: "巴西",
    coordinates: [-14.235, -51.9253],
    info: "世界上最大的咖啡生产国，生产各种风味的咖啡豆。",
    image: "images/baxi.jpg",
    mainVarieties: ["波旁", "卡杜拉", "新世界", "卡杜艾"],
    flavorNotes: ["巧克力", "坚果", "焦糖", "奶油", "平衡"]
  },
  {
    name: "巴拿马",
    coordinates: [8.538, -80.7821],
    info: "以其瑰夏咖啡而闻名，具有精致的花香和柑橘香气。",
    image: "images/banama.jpg",
    mainVarieties: ["瑰夏", "铁皮卡", "波旁", "卡杜拉"],
    flavorNotes: ["花香", "柑橘", "浆果", "热带水果", "甜感"]
  },
  {
    name: "危地马拉",
    coordinates: [15.7835, -90.2308],
    info: "以其火山土壤种植的咖啡豆而闻名，具有浓郁的巧克力和坚果香气。",
    image: "images/weijia.jpg",
    mainVarieties: ["波旁", "卡杜拉", "卡杜艾", "铁皮卡", "帕奇"],
    flavorNotes: ["巧克力", "坚果", "香料", "烟草", "碳烧香"]
  },
  {
    name: "哥伦比亚",
    coordinates: [4.5709, -74.2973],
    info: "以其均衡的风味和中等醇厚度而闻名，通常具有柑橘和焦糖的味道。",
    image: "images/gelunbiya.jpg",
    mainVarieties: ["卡杜拉", "卡斯提优"],
    flavorNotes: ["柑橘", "焦糖", "坚果", "巧克力", "果香"]
  },
  {
    name: "洪都拉斯",
    coordinates: [15.1999, -86.2419],
    info: "以其浓郁的甜味和均衡的酸度而闻名，通常带有坚果和巧克力的味道。",
    image: "images/hongdulasi.jpeg",
    mainVarieties: ["卡杜拉", "卡杜艾", "波旁", "帕卡斯", "铁皮卡"],
    flavorNotes: ["水果", "甜感", "坚果", "巧克力", "温和"]
  },
  {
    name: "乌干达",
    coordinates: [1.3733, 32.2903],
    info: "以其罗布斯塔咖啡豆而闻名，具有浓郁的咖啡因和巧克力香气。",
    image: "images/wuganda.jpg",
    mainVarieties: ["罗布斯塔", "阿拉比卡 (SL-28, SL-14, 铁比卡)"],
    flavorNotes: ["巧克力", "奶油", "香草", "黑色水果", "甜感"]
  },
  {
    name: "哥斯达黎加",
    coordinates: [9.7489, -83.7534],
    info: "以其明亮的酸度和果味而闻名，通常带有柑橘和浆果的味道。",
    image: "images/gesida.jpg",
    mainVarieties: ["卡杜拉", "卡图艾", "波旁"],
    flavorNotes: ["柑橘", "浆果", "甜感", "平衡"]
  },
  {
    name: "肯尼亚",
    coordinates: [-0.0236, 37.9062],
    info: "以其浓郁的果味和黑醋栗香气而闻名，酸度明亮。",
    image: "images/kenniyatuupian.jpeg",
    mainVarieties: ["SL28", "SL34", "K7", "肯特", "鲁伊鲁2"],
    flavorNotes: ["黑醋栗", "莓果", "柑橘", "花香", "酒香"]
  },
  {
    name: "云南",
    coordinates: [25.0432, 102.7073],
    info: "中国最大的咖啡产区，以其柔和的口感和坚果香气而闻名。",
    image: "images/yunantupian.jpg",
    mainVarieties: ["卡蒂姆", "铁皮卡", "波旁"],
    flavorNotes: ["坚果", "巧克力", "焦糖", "柔和"]
  },
];
coffeeOrigins.forEach(function (origin) {
    var coffeeIcon = L.icon({ // 创建自定义图标
      iconUrl: origin.image, //  使用 origin.image 指定图片路径
      iconSize: [32, 32], //  设置图标大小
      iconAnchor: [16, 16] //  设置图标锚点
    });
  
    var marker = L.marker(origin.coordinates).addTo(map);
    

    // 创建一个隐藏的 div，包含图片和详细描述
    const popupContent = `
    <div class="map-origin-details"> 
      <img src="${origin.image}" alt="${origin.name}"> 
      <h3>${origin.name}</h3>
      <p>${origin.info}</p>
      <p><b>主要咖啡品种:</b> ${origin.mainVarieties.join(", ")}</p> 
      <p><b>风味特点:</b> ${origin.flavorNotes.join(", ")}</p> 
    </div>
  `;

// 只在地标上显示地名
marker.bindPopup(origin.name);

// 点击地标时，显示隐藏的 div
marker.on('click', function(e) {
  this.getPopup().setContent(popupContent); 
  this.getPopup().update();

});
});
  

  
// 添加标记

// 咖啡豆风味轮数据
const flavorData = {
    labels: [
      "花香",
      "果香",
      "柑橘",
      "浆果",
      "核果",
      "甜香",
      "焦糖",
      "巧克力",
      "坚果",
      "香料",
      "烘焙",
      "其他",
      "茉莉花",
      "玫瑰",
      "薰衣草",
      "柑橘花",
      "金银花",
      "柠檬",
      "橙子",
      "葡萄柚",
      "青柠",
      "黑莓",
      "蓝莓",
      "草莓",
      "覆盆子",
      "黑醋栗",
      "葡萄",
      "苹果",
      "梨",
      "桃子",
      "杏子",
      "樱桃",
      "李子",
      "红糖",
      "枫糖",
      "蜂蜜",
      "焦糖",
      "巧克力",
      "黑巧克力",
      "牛奶巧克力",
      "榛果",
      "杏仁",
      "核桃",
      "花生",
      "肉桂",
      "丁香",
      "肉豆蔻",
      "胡椒",
      "烤面包",
      "烟熏",
      "泥土",
      "药草",
      "发酵",
    ],
    datasets: [
      {
        data: [
          1, 1, 0.8, 0.8, 0.6, 1, 0.5, 0.6, 0.8, 0.7, 0.6, 0.5, 0.15, 0.1, 0.1,
          0.15, 0.1, 0.2, 0.15, 0.15, 0.1, 0.2, 0.15, 0.15, 0.1, 0.1, 0.15,
          0.1, 0.1, 0.15, 0.1, 0.1, 0.1, 0.15, 0.1, 0.1, 0.2, 0.2, 0.15, 0.15,
          0.2, 0.15, 0.1, 0.1, 0.1, 0.1, 0.1, 0.15, 0.1, 0.1, 0.1, 0.1,
        ],
        backgroundColor: [
          "#FFB6C1", // 花香
          "#FFA07A", // 果香
          "#FFA500", // 柑橘
          "#DC143C", // 浆果
          "#DDA0DD", // 核果
          "#F08080", // 甜香
          "#D2691E", // 焦糖
          "#D2691E", // 巧克力
          "#A0522D", // 坚果
          "#A52A2A", // 香料
          "#8B4513", // 烘焙
          "#708090", // 其他
          // 花香子类别颜色
          "#FFC0CB",
          "#FFB6C1",
          "#DB7093",
          "#F08080",
          "#FA8072",
          // 柑橘子类别颜色
          "#FFD700",
          "#FFA500",
          "#FF8C00",
          "#F0E68C",
          "#FFFFE0",
          // 浆果子类别颜色
          "#FF1493",
          "#C71585",
          "#DB7093",
          "#FF69B4",
          "#FFC0CB",
          // ... 其他子类别颜色
        ],
        hoverBackgroundColor: [
          // 与 backgroundColor 相同，或根据需要调整
        ],
      },
    ],
  };
  const ctx = document.getElementById("wheel").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "pie",
    data: flavorData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "right",
          align:'start',
          labels: {
            font: {
              family: "'Times New Roman', serif",
            },
            boxWidth: 18,        // 调整图例颜色方块大小
            padding: 28,          // 调整图例项之间的间距
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.label + " (" + context.parsed + "%)";
            },
          },
        },
      },
    },
  });

// 手冲咖啡器具数据
const equipmentData = [
  {
    image: "images/hario-v60.jpg",
    title: "滤杯",
    text: "滤杯是手冲咖啡的核心器具，它承载着咖啡粉，并引导热水流过咖啡粉，萃取出咖啡液。常见的滤杯种类包括 Hario V60、Kalita Wave、Melitta 等，每种滤杯都有其独特的结构和冲煮特点。"
  },
  {
    image: "images/hario-buono-kettle.jpg",
    title: "手冲壶",
    text: "手冲壶用于控制热水的水流和水温，细长的壶嘴能够精准地控制水流，使热水均匀地浇注在咖啡粉上。选择手冲壶时，需要注意壶嘴的形状、壶身的容量和材质等因素。"
  },
  {
    image: "images/filters.jpg",
    title: "滤纸",
    text: "滤纸用于过滤咖啡渣，使咖啡液更加干净清澈。滤纸的材质和形状会影响咖啡的口感，常见的滤纸材质包括漂白滤纸和原木浆滤纸，形状则有圆锥形和扇形等。"
  },
  {
    image: "images/grinder.jpg",
    title: "磨豆机",
    text: "磨豆机用于将咖啡豆研磨成咖啡粉，新鲜研磨的咖啡粉能够最大程度地保留咖啡的香气和风味。选择磨豆机时，需要注意研磨均匀度、研磨速度、清洁方便程度等因素。"
  },
  {
    image: "images/server.jpg",
    title: "分享壶",
    text: "分享壶用于盛放冲煮好的咖啡液，方便分享或二次分杯。分享壶的材质和保温性能是选择时需要考虑的因素。"
  },
  {
    image: "images/scale.jpg",
    title: "电子秤",
    text: "电子秤用于精确称量咖啡豆和水的重量，以确保每次冲煮都能保持一致的比例。选择电子秤时，需要注意精度、响应速度、稳定性等因素。"
  }
];

// 渲染手冲咖啡器具卡片
function renderEquipmentCards() {
  const equipmentGrid = document.querySelector('.equipment-grid');
  equipmentData.forEach(equipment => {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');
    card.innerHTML = `
      <div class="card equipment-card">
        <img src="${equipment.image}" class="card-img-top" alt="${equipment.title}">
        <div class="card-body">
          <h5 class="card-title">${equipment.title}</h5>
          <p class="card-text">${equipment.text}</p>
        </div>
      </div>
    `;
    equipmentGrid.appendChild(card);
  });
}  
// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', () => {
  loadAndRenderCoffeeData();
  generateTableOfContents(); // 生成目录
  initializeMap();
  createFlavorWheel();
  renderEquipmentCards();
});
