---
title: 从0开始的leetcode
date: 2025-04-16
description: 长期使用gpt使我大脑光滑……
tags: 
    - code
---

感觉自己笨笨的。开看！

[灵茶山艾府_合集·基础算法精讲 高频面试题](https://space.bilibili.com/206214/lists/842776?type=season)

## 双指针

两数之和-167，三数之和-15

> 167: 一些从小到大排序的数，有一个target数。目标是选出唯一的两个数，和为target。

方法：一个指针从最小的开始，一个指针从最大的开始。

最小的和最大的相加，和target比较。比target大 - 把最大的往前移。比target小 - 把最小的往后移

```python
l, r = 0, len(numbers) - 1 # 一个最小一个最大

while l < r:
    current_sum = numbers[l] + numbers[r]
    if (current_sum > target):
        # sum too large, must decrement right pointer to decrease it
        r -= 1
    elif (current_sum < target):
        # sum too small, must increment left pointer to increase it
        l += 1
    else:
        # found our answer
        return [l + 1, r + 1] # lr是数组(从0开始数)，题要求第几个(从1开始)
```

> 15: Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j, i != k, and j != k`, and `nums[i] + nums[j] + nums[k] == 0`.
> 
> Notice that the solution set must not contain duplicate triplets.

一堆数，没有排序，返回所有加起来是0的组。

方法：先排序，拿出1个数`i`，让剩下两个数加起来为`-i`，变为两数之和

`i`只需遍历到`n-2`，给j和k留位置。第一层循环：遍历i。第二层循环

```python
def threeSum(self, nums):
    """
    :type nums: List[int]
    :rtype: List[List[int]]
    """
    nums.sort() # 先排序
    # j + k = -i
    ans = []
    n = len(nums)

    for i in range(0, n-2):
        x = nums[i] # 第一个数
        if i > 0 and x == nums[i-1]: # 当前的i和前一个i一样，跳过
            continue
        j = i + 1 # 第二个数，i后面开始
        k = n - 1 # 第三个数，最大的
    
        while j < k:
            s = x + nums[j] + nums[k]
            if s < 0:
                j += 1 # 和太小，把j右移
            elif s > 0:
                k -= 1 # 和太大，把k左移
            else: # 和为0
                ans.append([x, nums[j], nums[k]]) # 把这三个数存到结果里
                j += 1 # 去看下一个更大的j
                while j < k and nums[j] == nums[j - 1]: 
                # 如果这个下一个j和刚刚的j值一样
                    j += 1 # 跳过这个数，看更下一个j
                k -= 1 # 去看下一个更小的k
                while j < k and nums[k] == nums[k + 1]:
                # 如果k和刚才的k一样大
                    k -= 1 # 再看下一个

    return ans
```

时间复杂度：O(n²)，外层O(n)，内层双指针O(n)

## python小知识（gpt把我变成笨蛋）

1. if, elif, else

有ABC三种事件，加起来概率为1，此时我们应该使用`if A, elif B, else`

而不是`if A, if B, else`。这是如果A，做一些事情，如果非A，do nothing，再去判断B，如果非B，else。

此时else执行的条件只有非B一个事件……也就是A和C

所以一定要用`elif`哩！