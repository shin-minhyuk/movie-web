function Search() {
  /**
   * input change가 발생할 때, 마지막 이벤트 기준으로 n초 뒤에 데이터를 불러와야함
   * onChange 이벤트 => 검색을 할 때, url이 바뀜,
   *  */

  useEffect(() => {
    const id = setTimeout(() => {
      // getRegExp => 한국어 정규식 라이브러리, inputValue => 상태로 관리
      const reg = getRegExp(inputValue);

      // 검색 API
    }, 5000);

    return () => clearTimeout(id);
  }, [inputChange]);

  return (
    <div>
      <div>
        <input type="text" placeholder="보고싶은 영화를 검색해주세요" />
      </div>
      <div></div>
    </div>
  );
}

export default Search;
