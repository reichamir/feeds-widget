var feedsWidgetNs = feedsWidgetNs || {};
feedsWidgetNs.BaseFeed = function(caption, url, isOpenInNewTab) {
    this.caption = caption;
    this.url = url;
    this.isOpenInNewTab = isOpenInNewTab;
}

feedsWidgetNs.BaseThumbnailFeed = function(thumbnail, caption, url, isOpenInNewTab) {
    feedsWidgetNs.BaseFeed.call(this, caption, url, isOpenInNewTab);
    this.thumbnail = thumbnail;
}
feedsWidgetNs.BaseThumbnailFeed.prototype = new feedsWidgetNs.BaseFeed();

feedsWidgetNs.OrganicFeed = function(thumbnail, caption, url) {
    feedsWidgetNs.BaseThumbnailFeed.call(this, thumbnail, caption, url, false);
}
feedsWidgetNs.OrganicFeed.prototype = new feedsWidgetNs.BaseThumbnailFeed();

feedsWidgetNs.SponsoredFeed = function(thumbnail, caption, url, sourceRecommendationName) {
    feedsWidgetNs.BaseThumbnailFeed.call(this, thumbnail, caption, url, true);
    this.sourceRecommendationName = sourceRecommendationName;
}
feedsWidgetNs.SponsoredFeed.prototype = new feedsWidgetNs.BaseThumbnailFeed();