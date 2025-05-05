// TODO: 完成新的取得所有文章方法
export function useGetPublishedArticles() {
  /**
   * 獲取所有已發布的文章（包含子目錄）
   */
  function getAllPublishedArticles() {
    return queryCollection('articles')
      .order('published_date', 'DESC')
      .all()
  }

  return {
    getAllPublishedArticles,
  }
}
