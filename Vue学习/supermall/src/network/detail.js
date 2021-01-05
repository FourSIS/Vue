import {request} from "network/request"

export function getDetailInfo(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  })
}

export function getRecommendInfo() {
  return request({
    url: "/recommend"
  })
}

// 数据整合可以写到一个类的构造方法中，然后new，直接整合完毕
// 通过一个类的构造方法，对数据进行整合，在组件中new Goods拿到的对象，其中已经包括了所有需要的内容，到时候直接xxx.title...直接用就可以了
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.olaPrice;
    this.discount = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCOunt - shopInfo.cGoods;
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 这里用三目运算符的原因： 有的Image可能有值，但是有的可能没有，这里做一个选择
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}