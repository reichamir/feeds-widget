var feedsWidgetNs = feedsWidgetNs || {};
feedsWidgetNs.feedFactory = function() {
    return {
        create: create.bind(this)
    };

    function create(feedResponse) {
        var feed;
        var thumbnailUrl = getThumbnailUrl(feedResponse.thumbnail);
        
        switch(feedResponse.origin) {
            case 'organic':
                feed = new feedsWidgetNs.OrganicFeed(thumbnailUrl, feedResponse.name, feedResponse.url);
                break;
            case 'sponsored':
                feed = new feedsWidgetNs.SponsoredFeed(thumbnailUrl, feedResponse.name, feedResponse.url, feedResponse.branding);
                break;
            default:
                throw 'Unknown feed type: ' + feedResponse.origin; 
                break;
        }
    
        return feed;
    }
    
    function getThumbnailUrl(thumbnail) {
        if (thumbnail.length == 0 && thumbnail[0] == null) {
            return 'defaultThumbnailUrl.png';
        } 
        
        return thumbnail[0].url;
    }
}
