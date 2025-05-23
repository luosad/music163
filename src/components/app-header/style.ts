import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  height: 75px;
  background-color: #242424;
  font-size: 14px;

  .content {
    display: flex;
    justify-content: space-between;
    height: 70px;
  }

  .divider {
    height: 5px;
    background-color: #c20c0c;
  }
`

export const HeaderLeft = styled.div`
  display: flex;

  .logo {
    display: block;
    width: 176px;
    height: 69px;
    background-position: 0 0;
    text-indent: -9999px;
  }

  .title-list {
    display: flex;
    line-height: 70px;

    .item {
      position: relative;

      a {
        display: block;
        padding: 0 20px;
        color: #ccc;
        text-decoration: none;

        &:hover,
        &.active {
          color: #fff;
          background: #000;
        }

        &.active .icon {
          position: absolute;
          display: inline-block;
          width: 12px;
          height: 7px;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          background-position: -226px 0;
        }
      }
    }
  }
`

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  color: #ccc;
  font-size: 12px;

  .center {
    width: 90px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #666;
    border-radius: 16px;
    margin: 0 16px;
    cursor: pointer;

    &:hover {
      color: #fff;
      border-color: #fff;
    }
  }

  .login {
    color: #ccc;
    cursor: pointer;

    &:hover {
      color: #fff;
    }
  }
`

export const SearchWrapper = styled.div`
  position: relative;
  width: 158px;

  .search {
    width: 100%;
    height: 32px;
    border-radius: 16px;

    input {
      &::placeholder {
        font-size: 12px;
      }
    }
  }
`

export const SuggestList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 300px;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;

  li {
    padding: 8px 12px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f5f5f5;
      color: #000;
    }
  }
`
