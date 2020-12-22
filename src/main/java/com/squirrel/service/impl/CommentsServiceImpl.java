package com.squirrel.service.impl;

import com.squirrel.dao.CommentsMapper;
import com.squirrel.dao.GoodsMapper;
import com.squirrel.pojo.Comments;
import com.squirrel.pojo.Goods;
import com.squirrel.service.CommentsService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("commentsService")
public class CommentsServiceImpl implements CommentsService {

    @Resource
    private CommentsMapper commentsMapper;

    @Resource
    private GoodsMapper goodsMapper;

    @Override
    public int addComments(Comments comments) {
        Goods goods = goodsMapper.selectByPrimaryKey(comments.getGoodsId());
        goods.setCommetNum(goods.getCommetNum()+1);
        goodsMapper.updateByPrimaryKey(goods);
        return commentsMapper.insert(comments);
    }

    @Override
    public boolean updateCommentsById(Comments comments) {
        return commentsMapper.updateByPrimaryKeyWithBLOBs(comments) > 0;
    }

    @Override
    public boolean deleteCommentsById(int id) {
        Comments comments = commentsMapper.selectByPrimaryKey(id);
        Goods goods = goodsMapper.selectByPrimaryKey(comments.getGoodsId());
        goods.setCommetNum(goods.getCommetNum()-1);
        goodsMapper.updateByPrimaryKey(goods);
        return commentsMapper.deleteByPrimaryKey(id) > 0;
    }

    @Override
    public List<Comments> getCommentsByGoodsId(int goodsId) {
        return commentsMapper.selectByGoodsId(goodsId);
    }
}
